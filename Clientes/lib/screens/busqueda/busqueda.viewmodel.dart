import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/search_request.dart';
import '../../../models/lugar.dart';

class BusquedaViewModel extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  bool _isLoading = false;
  String? _errorMessage;
  List<Lugar> _lugares = [];
  bool _isBusquedaAvanzada = false;
  DateTime? _fechaLlegada;
  DateTime? _fechaSalida;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  List<Lugar> get lugares => _lugares;
  bool get isBusquedaAvanzada => _isBusquedaAvanzada;
  DateTime? get fechaLlegada => _fechaLlegada;
  DateTime? get fechaSalida => _fechaSalida;

  final TextEditingController ciudadController = TextEditingController();
  final TextEditingController huespedesController = TextEditingController();
  final TextEditingController camasController = TextEditingController();
  final TextEditingController baniosController = TextEditingController();
  final TextEditingController habitacionesController = TextEditingController();

  bool _tieneWifi = false;
  bool _tieneParqueo = false;

  bool get tieneWifi => _tieneWifi;
  bool get tieneParqueo => _tieneParqueo;

  void toggleBusquedaAvanzada() {
    _isBusquedaAvanzada = !_isBusquedaAvanzada;
    notifyListeners();
  }

  void setFechaLlegada(DateTime fecha) {
    _fechaLlegada = fecha;
    notifyListeners();
  }

  void setFechaSalida(DateTime fecha) {
    _fechaSalida = fecha;
    notifyListeners();
  }

  void setTieneWifi(bool value) {
    _tieneWifi = value;
    notifyListeners();
  }

  void setTieneParqueo(bool value) {
    _tieneParqueo = value;
    notifyListeners();
  }

  Future<bool> buscar() async {
    if (ciudadController.text.isEmpty ||
        _fechaLlegada == null ||
        _fechaSalida == null ||
        huespedesController.text.isEmpty) {
      _errorMessage = 'Por favor complete los campos obligatorios';
      notifyListeners();
      return false;
    }

    if (_fechaSalida!.isBefore(_fechaLlegada!)) {
      _errorMessage = 'La fecha de salida debe ser posterior a la de llegada';
      notifyListeners();
      return false;
    }

    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final request = SearchRequest(
        ciudad: ciudadController.text.trim(),
        fechaLlegada: _fechaLlegada!,
        fechaSalida: _fechaSalida!,
        cantHuespedes: int.parse(huespedesController.text),
        cantCamas: _isBusquedaAvanzada && camasController.text.isNotEmpty
            ? int.parse(camasController.text)
            : null,
        cantBanios: _isBusquedaAvanzada && baniosController.text.isNotEmpty
            ? int.parse(baniosController.text)
            : null,
        cantHabitaciones:
            _isBusquedaAvanzada && habitacionesController.text.isNotEmpty
            ? int.parse(habitacionesController.text)
            : null,
        tieneWifi: _isBusquedaAvanzada ? _tieneWifi : null,
        tieneParqueo: _isBusquedaAvanzada ? _tieneParqueo : null,
      );

      _lugares = await _apiService.buscarLugares(
        request,
        avanzada: _isBusquedaAvanzada,
      );

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error al buscar lugares: ${e.toString()}';
      notifyListeners();
      return false;
    }
  }

  @override
  void dispose() {
    ciudadController.dispose();
    huespedesController.dispose();
    camasController.dispose();
    baniosController.dispose();
    habitacionesController.dispose();
    super.dispose();
  }
}
