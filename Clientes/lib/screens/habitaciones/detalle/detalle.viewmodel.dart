import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/lugar.dart';

class DetalleViewModel extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  bool _isLoading = false;
  String? _errorMessage;
  Lugar? _lugar;
  int _fotoSeleccionadaIndex = 0;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  Lugar? get lugar => _lugar;
  int get fotoSeleccionadaIndex => _fotoSeleccionadaIndex;

  Future<void> cargarLugar(int id) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _lugar = await _apiService.obtenerLugar(id);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error al cargar lugar: ${e.toString()}';
      notifyListeners();
    }
  }

  void seleccionarFoto(int index) {
    _fotoSeleccionadaIndex = index;
    notifyListeners();
  }
}
