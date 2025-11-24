import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/lugar.dart';
import '../../../models/reserva.dart';

class ReservaViewModel extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  bool _isLoading = false;
  String? _errorMessage;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  double calcularPrecioNoches(Lugar lugar, String llegada, String salida) {
    final fechaLlegada = DateTime.parse(llegada);
    final fechaSalida = DateTime.parse(salida);
    final noches = fechaSalida.difference(fechaLlegada).inDays;
    return lugar.precioNoche * noches;
  }

  double calcularPrecioServicio(double precioNoches) {
    return precioNoches * 0.10; // 10% de servicio
  }

  double calcularPrecioTotal(Lugar lugar, String llegada, String salida) {
    final fechaLlegada = DateTime.parse(llegada);
    final fechaSalida = DateTime.parse(salida);
    final precioNoches = calcularPrecioNoches(lugar, fechaLlegada, fechaSalida);
    final precioServicio = calcularPrecioServicio(precioNoches);
    return precioNoches + lugar.costoLimpieza + precioServicio;
  }

  Future<bool> confirmarReserva(
    Lugar lugar,
    String llegada,
    String salida,
  ) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final clienteId = await _apiService.getClienteId();
      if (clienteId == null) {
        _errorMessage = 'No se encontró el cliente. Inicie sesión nuevamente.';
        _isLoading = false;
        notifyListeners();
        return false;
      }

      final precioNoches = calcularPrecioNoches(lugar, llegada, salida);
      final precioServicio = calcularPrecioServicio(precioNoches);
      final precioTotal = calcularPrecioTotal(lugar, llegada, salida);

      final reserva = Reserva(
        lugar_id: lugar.id,
        cliente_id: clienteId,
        fechaInicio: llegada,
        fechaFin: salida,
        precioTotal: precioTotal,
        precioLimpieza: lugar.costoLimpieza,
        precioNoches: precioNoches,
        precioServicio: precioServicio,
      );

      await _apiService.crearReserva(reserva);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error al crear reserva: ${e.toString()}';
      notifyListeners();
      return false;
    }
  }
}
