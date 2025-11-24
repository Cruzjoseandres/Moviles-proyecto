class SearchRequest {
  final String ciudad;
  final DateTime fechaLlegada;
  final DateTime fechaSalida;
  final int cantHuespedes;
  final int? cantCamas;
  final int? cantBanios;
  final int? cantHabitaciones;
  final bool? tieneWifi;
  final bool? tieneParqueo;

  SearchRequest({
    required this.ciudad,
    required this.fechaLlegada,
    required this.fechaSalida,
    required this.cantHuespedes,
    this.cantCamas,
    this.cantBanios,
    this.cantHabitaciones,
    this.tieneWifi,
    this.tieneParqueo,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'ciudad': ciudad,
      'fechaLlegada': fechaLlegada.toIso8601String().split('T')[0],
      'fechaSalida': fechaSalida.toIso8601String().split('T')[0],
      'cantHuespedes': cantHuespedes,
    };

    if (cantCamas != null) map['cantCamas'] = cantCamas!;
    if (cantBanios != null) map['cantBanios'] = cantBanios!;
    if (cantHabitaciones != null) map['cantHabitaciones'] = cantHabitaciones!;
    if (tieneWifi != null) map['tieneWifi'] = tieneWifi!;
    if (tieneParqueo != null) map['tieneParqueo'] = tieneParqueo!;

    return map;
  }
}
