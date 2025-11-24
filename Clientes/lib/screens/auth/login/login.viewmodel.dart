import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/auth_request.dart';

class LoginViewModel extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  bool _isLoading = false;
  String? _errorMessage;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  Future<bool> login() async {
    if (emailController.text.isEmpty || passwordController.text.isEmpty) {
      _errorMessage = 'Por favor complete todos los campos';
      notifyListeners();
      return false;
    }

    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final request = LoginRequest(
        email: emailController.text.trim(),
        password: passwordController.text,
      );

      await _apiService.login(request);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error al iniciar sesión: ${e.toString()}';
      notifyListeners();
      return false;
    }
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }
}
