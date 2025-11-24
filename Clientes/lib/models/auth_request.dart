class LoginRequest {
  final String email;
  final String password;

  LoginRequest({required this.email, required this.password});

  Map<String, dynamic> toJson() {
    return {'email': email, 'password': password};
  }
}

class RegisterRequest {
  final String email;
  final String nombrecompleto;
  final String password;
  final String telefono;

  RegisterRequest({
    required this.email,
    required this.nombrecompleto,
    required this.password,
    required this.telefono,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'nombrecompleto': nombrecompleto,
      'password': password,
      'telefono': telefono,
    };
  }
}
