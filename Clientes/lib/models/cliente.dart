class Cliente {
  final int id;
  final String email;
  final String nombrecompleto;
  final String telefono;

  Cliente({
    required this.id,
    required this.email,
    required this.nombrecompleto,
    required this.telefono,
  });

  factory Cliente.fromJson(Map<String, dynamic> json) {
    return Cliente(
      id: json['id'],
      email: json['email'],
      nombrecompleto: json['nombrecompleto'],
      telefono: json['telefono'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'nombrecompleto': nombrecompleto,
      'telefono': telefono,
    };
  }
}
