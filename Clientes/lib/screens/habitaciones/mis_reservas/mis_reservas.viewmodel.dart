import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/reserva.dart';

class MisReservasViewModel extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  bool _isLoading = false;
  String? _errorMessage;
  List<Reserva> _reservas = [];

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  List<Reserva> get reservas => _reservas;

  Future<void> cargarReservas() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final clienteId = await _apiService.getClienteId();
      if (clienteId == null) {
        _errorMessage = 'No se encontró el cliente. Inicie sesión nuevamente.';
        _isLoading = false;
        notifyListeners();
        return;
      }

      _reservas = await _apiService.obtenerReservasCliente(clienteId);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error al cargar reservas: ${e.toString()}';
      notifyListeners();
    }
  }
}
