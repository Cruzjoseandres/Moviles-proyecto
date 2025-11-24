class Reserva {
  final int? id;
  final int lugarId;
  final int clienteId;
  final DateTime fechaInicio;
  final DateTime fechaFin;
  final double precioTotal;
  final double precioLimpieza;
  final double precioNoches;
  final double precioServicio;
  final String? nombreLugar;
  final String? ciudadLugar;

  Reserva({
    this.id,
    required this.lugarId,
    required this.clienteId,
    required this.fechaInicio,
    required this.fechaFin,
    required this.precioTotal,
    required this.precioLimpieza,
    required this.precioNoches,
    required this.precioServicio,
    this.nombreLugar,
    this.ciudadLugar,
  });

  factory Reserva.fromJson(Map<String, dynamic> json) {
    return Reserva(
      id: json['id'],
      lugarId: json['lugar_id'],
      clienteId: json['cliente_id'],
      fechaInicio: DateTime.parse(json['fechaInicio']),
      fechaFin: DateTime.parse(json['fechaFin']),
      precioTotal: double.parse(json['precioTotal'].toString()),
      precioLimpieza: double.parse(json['precioLimpieza'].toString()),
      precioNoches: double.parse(json['precioNoches'].toString()),
      precioServicio: double.parse(json['precioServicio'].toString()),
      nombreLugar: json['nombreLugar'],
      ciudadLugar: json['ciudadLugar'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      'lugar_id': lugarId,
      'cliente_id': clienteId,
      'fechaInicio': fechaInicio.toIso8601String().split('T')[0],
      'fechaFin': fechaFin.toIso8601String().split('T')[0],
      'precioTotal': precioTotal,
      'precioLimpieza': precioLimpieza,
      'precioNoches': precioNoches,
      'precioServicio': precioServicio,
    };
  }
}
