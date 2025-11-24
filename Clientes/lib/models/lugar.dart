class Lugar {
  final int id;
  final String nombre;
  final String descripcion;
  final int cantPersonas;
  final int cantCamas;
  final int cantBanios;
  final int cantHabitaciones;
  final bool tieneWifi;
  final int cantVehiculosParqueo;
  final double precioNoche;
  final double costoLimpieza;
  final String ciudad;
  final String latitud;
  final String longitud;
  final int arrendatarioId;
  final List<String> fotos;
  final String? nombreAnfitrion;

  Lugar({
    required this.id,
    required this.nombre,
    required this.descripcion,
    required this.cantPersonas,
    required this.cantCamas,
    required this.cantBanios,
    required this.cantHabitaciones,
    required this.tieneWifi,
    required this.cantVehiculosParqueo,
    required this.precioNoche,
    required this.costoLimpieza,
    required this.ciudad,
    required this.latitud,
    required this.longitud,
    required this.arrendatarioId,
    this.fotos = const [],
    this.nombreAnfitrion,
  });

  factory Lugar.fromJson(Map<String, dynamic> json) {
    final List<String> fotosList = [];
    if (json['fotos'] != null) {
      for (final foto in json['fotos']) {
        if (foto is Map<String, dynamic> && foto['url'] != null) {
          fotosList.add(foto['url']);
        } else if (foto is String) {
          fotosList.add(foto);
        }
      }
    }

    String? nombreAnfitrion;
    if (json['arrendatario'] != null &&
        json['arrendatario']['nombrecompleto'] != null) {
      nombreAnfitrion = json['arrendatario']['nombrecompleto'];
    } else if (json['nombreAnfitrion'] != null) {
      nombreAnfitrion = json['nombreAnfitrion'];
    }

    return Lugar(
      id: json['id'],
      nombre: json['nombre'],
      descripcion: json['descripcion'],
      cantPersonas: json['cantPersonas'],
      cantCamas: json['cantCamas'],
      cantBanios: json['cantBanios'],
      cantHabitaciones: json['cantHabitaciones'],
      tieneWifi: json['tieneWifi'] == 1 || json['tieneWifi'] == true,
      cantVehiculosParqueo: json['cantVehiculosParqueo'] ?? 0,
      precioNoche: double.parse(json['precioNoche'].toString()),
      costoLimpieza: double.parse(json['costoLimpieza'].toString()),
      ciudad: json['ciudad'],
      latitud: json['latitud'].toString(),
      longitud: json['longitud'].toString(),
      arrendatarioId: json['arrendatario_id'],
      fotos: fotosList,
      nombreAnfitrion: nombreAnfitrion,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'descripcion': descripcion,
      'cantPersonas': cantPersonas,
      'cantCamas': cantCamas,
      'cantBanios': cantBanios,
      'cantHabitaciones': cantHabitaciones,
      'tieneWifi': tieneWifi ? 1 : 0,
      'cantVehiculosParqueo': cantVehiculosParqueo,
      'precioNoche': precioNoche.toString(),
      'costoLimpieza': costoLimpieza.toString(),
      'ciudad': ciudad,
      'latitud': latitud,
      'longitud': longitud,
      'arrendatario_id': arrendatarioId,
      'fotos': fotos,
      'nombreAnfitrion': nombreAnfitrion,
    };
  }
}
