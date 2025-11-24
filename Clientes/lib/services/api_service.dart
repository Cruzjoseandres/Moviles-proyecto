import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/cliente.dart';
import '../models/lugar.dart';
import '../models/reserva.dart';
import '../models/search_request.dart';
import '../models/auth_request.dart';

class ApiService {
  static const String baseUrl = 'https://airbnbmob2.site/api';

  // Auth Methods
  Future<Map<String, dynamic>> login(LoginRequest request) async {
    final response = await http.post(
      Uri.parse('$baseUrl/cliente/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(request.toJson()),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('cliente', jsonEncode(data));

      dynamic idValue;
      if (data is Map<String, dynamic>) {
        idValue = data['id'] ??
            data['cliente_id'] ??
            (data['cliente'] != null ? data['cliente']['id'] : null);
      }

      if (idValue != null) {
        await prefs.setInt('clienteId', int.parse(idValue.toString()));
      }
      return data;
    } else {
      throw Exception('Error al iniciar sesión: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> register(RegisterRequest request) async {
    final response = await http.post(
      Uri.parse('$baseUrl/cliente/registro'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(request.toJson()),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Error al registrarse: ${response.body}');
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('cliente');
    await prefs.remove('clienteId');
  }

  Future<Cliente?> getClienteActual() async {
    final prefs = await SharedPreferences.getInstance();
    final clienteJson = prefs.getString('cliente');
    if (clienteJson != null) {
      return Cliente.fromJson(jsonDecode(clienteJson));
    }
    return null;
  }

  Future<int?> getClienteId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt('clienteId');
  }

  // Lugares Methods
  Future<List<Lugar>> buscarLugares(
    SearchRequest request, {
    bool avanzada = false,
  }) async {
    final endpoint = avanzada ? 'advancedsearch' : 'search';
    final response = await http.post(
      Uri.parse('$baseUrl/lugares/$endpoint'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(request.toJson()),
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => Lugar.fromJson(json)).toList();
    } else {
      throw Exception('Error al buscar lugares: ${response.body}');
    }
  }

  Future<Lugar> obtenerLugar(int id) async {
    final response = await http.get(
      Uri.parse('$baseUrl/lugares/$id'),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      return Lugar.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Error al obtener lugar: ${response.body}');
    }
  }

  // Reservas Methods
  Future<Reserva?> crearReserva(Reserva reserva) async {
    final response = await http.post(
      Uri.parse('$baseUrl/reservas'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(reserva.toJson()),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      try {
        final decoded = jsonDecode(response.body);
        if (decoded is Map<String, dynamic>) {
          final reservaJson =
              decoded['reserva'] is Map<String, dynamic> ? decoded['reserva'] : decoded;
          if (reservaJson is Map<String, dynamic>) {
            return Reserva.fromJson(reservaJson);
          }
        }
      } catch (_) {
        // Ignorar errores de parseo, ya que la API puede devolver solo un mensaje.
      }
      return null;
    } else {
      throw Exception('Error al crear reserva: ${response.body}');
    }
  }

  Future<List<Reserva>> obtenerReservasCliente(int clienteId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/reservas/cliente/$clienteId'),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => Reserva.fromJson(json)).toList();
    } else {
      throw Exception('Error al obtener reservas: ${response.body}');
    }
  }
}
