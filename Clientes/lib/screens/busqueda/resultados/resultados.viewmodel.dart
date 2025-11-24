import 'package:flutter/material.dart';

class ResultadosViewModel extends ChangeNotifier {
  bool _verMapa = false;

  bool get verMapa => _verMapa;

  void toggleVista() {
    _verMapa = !_verMapa;
    notifyListeners();
  }
}
