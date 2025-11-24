import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../../../models/lugar.dart';
import '../../habitaciones/detalle/detalle.view.dart';

class MapaView extends StatefulWidget {
  final List<Lugar> lugares;
  final DateTime fechaLlegada;
  final DateTime fechaSalida;
  final VoidCallback onVolverLista;

  const MapaView({
    super.key,
    required this.lugares,
    required this.fechaLlegada,
    required this.fechaSalida,
    required this.onVolverLista,
  });

  @override
  State<MapaView> createState() => _MapaViewState();
}

class _MapaViewState extends State<MapaView> {
  GoogleMapController? _mapController;
  Set<Marker> _markers = {};
  Lugar? _lugarSeleccionado;

  @override
  void initState() {
    super.initState();
    _crearMarcadores();
  }

  void _crearMarcadores() {
    _markers = widget.lugares.map((lugar) {
      final double lat = double.tryParse(lugar.latitud) ?? 0;
      final double lng = double.tryParse(lugar.longitud) ?? 0;
      return Marker(
        markerId: MarkerId(lugar.id.toString()),
        position: LatLng(lat, lng),
        infoWindow: InfoWindow(
          title: lugar.nombre,
          snippet: '\$${lugar.precioNoche.toStringAsFixed(2)} por noche',
          onTap: () {
            setState(() {
              _lugarSeleccionado = lugar;
            });
          },
        ),
        onTap: () {
          setState(() {
            _lugarSeleccionado = lugar;
          });
        },
      );
    }).toSet();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.lugares.isEmpty) {
      return const Center(
        child: Text('No hay lugares para mostrar en el mapa'),
      );
    }

    final double centroLat =
        double.tryParse(widget.lugares.first.latitud) ?? 0;
    final double centroLng =
        double.tryParse(widget.lugares.first.longitud) ?? 0;

    final LatLng centro = LatLng(centroLat, centroLng);

    return Stack(
      children: [
        GoogleMap(
          initialCameraPosition: CameraPosition(target: centro, zoom: 12),
          markers: _markers,
          onMapCreated: (GoogleMapController controller) {
            _mapController = controller;
          },
        ),
        Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (_lugarSeleccionado != null)
                Container(
                  margin: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.2),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: InkWell(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => DetalleView(
                            lugarId: _lugarSeleccionado!.id,
                            fechaLlegada: widget.fechaLlegada,
                            fechaSalida: widget.fechaSalida,
                          ),
                        ),
                      );
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Row(
                        children: [
                          if (_lugarSeleccionado!.fotos.isNotEmpty)
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: Image.network(
                                _lugarSeleccionado!.fotos.first,
                                width: 80,
                                height: 80,
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) {
                                  return Container(
                                    width: 80,
                                    height: 80,
                                    color: Colors.grey.shade300,
                                    child: const Icon(Icons.home),
                                  );
                                },
                              ),
                            )
                          else
                            Container(
                              width: 80,
                              height: 80,
                              decoration: BoxDecoration(
                                color: Colors.grey.shade300,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Icon(Icons.home),
                            ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  _lugarSeleccionado!.nombre,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  _lugarSeleccionado!.descripcion,
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Colors.grey.shade600,
                                  ),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '\$${_lugarSeleccionado!.precioNoche.toStringAsFixed(2)} / noche',
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.blue,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const Icon(Icons.chevron_right),
                        ],
                      ),
                    ),
                  ),
                ),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.shade300,
                      blurRadius: 4,
                      offset: const Offset(0, -2),
                    ),
                  ],
                ),
                child: ElevatedButton.icon(
                  onPressed: widget.onVolverLista,
                  icon: const Icon(Icons.list),
                  label: const Text('Vista de Lista'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    minimumSize: const Size(double.infinity, 50),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _mapController?.dispose();
    super.dispose();
  }
}
