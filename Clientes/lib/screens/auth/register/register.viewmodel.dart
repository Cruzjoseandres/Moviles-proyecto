import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/auth_request.dart';

class RegisterViewModel extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  bool _isLoading = false;
  String? _errorMessage;
  String? _successMessage;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  String? get successMessage => _successMessage;

  final TextEditingController emailController = TextEditingController();
  final TextEditingController nombreController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController telefonoController = TextEditingController();

  Future<bool> register() async {
    if (emailController.text.isEmpty ||
        nombreController.text.isEmpty ||
        passwordController.text.isEmpty ||
        telefonoController.text.isEmpty) {
      _errorMessage = 'Por favor complete todos los campos';
      notifyListeners();
      return false;
    }

    _isLoading = true;
    _errorMessage = null;
    _successMessage = null;
    notifyListeners();

    try {
      final request = RegisterRequest(
        email: emailController.text.trim(),
        nombrecompleto: nombreController.text.trim(),
        password: passwordController.text,
        telefono: telefonoController.text.trim(),
      );

      await _apiService.register(request);
      _isLoading = false;
      _successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error al registrarse: ${e.toString()}';
      notifyListeners();
      return false;
    }
  }

  @override
  void dispose() {
    emailController.dispose();
    nombreController.dispose();
    passwordController.dispose();
    telefonoController.dispose();
    super.dispose();
  }
}
