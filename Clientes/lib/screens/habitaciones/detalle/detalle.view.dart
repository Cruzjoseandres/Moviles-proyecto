import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'detalle.viewmodel.dart';
import '../reserva/reserva.view.dart';

class DetalleView extends StatelessWidget {
  final int lugarId;
  final DateTime fechaLlegada;
  final DateTime fechaSalida;

  const DetalleView({
    super.key,
    required this.lugarId,
    required this.fechaLlegada,
    required this.fechaSalida,
  });

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => DetalleViewModel()..cargarLugar(lugarId),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Detalles del Lugar'),
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
        ),
        body: Consumer<DetalleViewModel>(
          builder: (context, viewModel, child) {
            if (viewModel.isLoading) {
              return const Center(child: CircularProgressIndicator());
            }

            if (viewModel.errorMessage != null) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      size: 64,
                      color: Colors.red,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      viewModel.errorMessage!,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              );
            }

            final lugar = viewModel.lugar;
            if (lugar == null) {
              return const Center(child: Text('Lugar no encontrado'));
            }

            return Column(
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Foto principal
                        if (lugar.fotos.isNotEmpty)
                          GestureDetector(
                            onTap: () {
                              showDialog(
                                context: context,
                                builder: (context) => Dialog(
                                  child: Stack(
                                    children: [
                                      Image.network(
                                        lugar.fotos[viewModel
                                            .fotoSeleccionadaIndex],
                                        fit: BoxFit.contain,
                                      ),
                                      Positioned(
                                        top: 8,
                                        right: 8,
                                        child: IconButton(
                                          icon: const Icon(Icons.close),
                                          color: Colors.white,
                                          onPressed: () =>
                                              Navigator.pop(context),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                            child: Image.network(
                              lugar.fotos[viewModel.fotoSeleccionadaIndex],
                              height: 300,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) {
                                return Container(
                                  height: 300,
                                  color: Colors.grey.shade300,
                                  child: const Icon(
                                    Icons.home,
                                    size: 100,
                                    color: Colors.grey,
                                  ),
                                );
                              },
                            ),
                          )
                        else
                          Container(
                            height: 300,
                            color: Colors.grey.shade300,
                            child: const Icon(
                              Icons.home,
                              size: 100,
                              color: Colors.grey,
                            ),
                          ),
                        // Galería de fotos pequeñas
                        if (lugar.fotos.length > 1)
                          Container(
                            height: 100,
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                              ),
                              itemCount: lugar.fotos.length,
                              itemBuilder: (context, index) {
                                final esSeleccionada =
                                    index == viewModel.fotoSeleccionadaIndex;
                                return Padding(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 4,
                                  ),
                                  child: GestureDetector(
                                    onTap: () =>
                                        viewModel.seleccionarFoto(index),
                                    child: Container(
                                      width: 100,
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: esSeleccionada
                                              ? Colors.blue
                                              : Colors.transparent,
                                          width: 3,
                                        ),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: ClipRRect(
                                        borderRadius: BorderRadius.circular(5),
                                        child: Image.network(
                                          lugar.fotos[index],
                                          fit: BoxFit.cover,
                                          errorBuilder:
                                              (context, error, stackTrace) {
                                                return Container(
                                                  color: Colors.grey.shade300,
                                                  child: const Icon(
                                                    Icons.image,
                                                  ),
                                                );
                                              },
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                        // Información del lugar
                        Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                lugar.nombre,
                                style: const TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                lugar.ciudad,
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                              const SizedBox(height: 16),
                              const Divider(),
                              const SizedBox(height: 16),
                              Text(
                                lugar.descripcion,
                                style: const TextStyle(fontSize: 16),
                              ),
                              const SizedBox(height: 24),
                              const Text(
                                'Características',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 16),
                              _buildCaracteristica(
                                Icons.people,
                                '${lugar.cantPersonas} personas',
                              ),
                              _buildCaracteristica(
                                Icons.bed,
                                '${lugar.cantCamas} camas',
                              ),
                              _buildCaracteristica(
                                Icons.bathroom,
                                '${lugar.cantBanios} baños',
                              ),
                              _buildCaracteristica(
                                Icons.meeting_room,
                                '${lugar.cantHabitaciones} habitaciones',
                              ),
                              _buildCaracteristica(
                                Icons.wifi,
                                lugar.tieneWifi
                                    ? 'Wi-Fi disponible'
                                    : 'Sin Wi-Fi',
                              ),
                              _buildCaracteristica(
                                Icons.local_parking,
                                lugar.cantVehiculosParqueo > 0
                                    ? 'Parqueo para ${lugar.cantVehiculosParqueo} vehículo(s)'
                                    : 'Sin parqueo',
                              ),
                              const SizedBox(height: 24),
                              if (lugar.nombreAnfitrion != null) ...[
                                const Text(
                                  'Anfitrión',
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                Row(
                                  children: [
                                    const CircleAvatar(
                                      child: Icon(Icons.person),
                                    ),
                                    const SizedBox(width: 12),
                                    Text(
                                      lugar.nombreAnfitrion!,
                                      style: const TextStyle(fontSize: 16),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 24),
                              ],
                              const Text(
                                'Precio',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Row(
                                children: [
                                  Text(
                                    '\$${lugar.precioNoche.toStringAsFixed(2)}',
                                    style: const TextStyle(
                                      fontSize: 32,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.blue,
                                    ),
                                  ),
                                  const Text(
                                    ' por noche',
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Costo de limpieza: \$${lugar.costoLimpieza.toStringAsFixed(2)}',
                                style: const TextStyle(
                                  fontSize: 14,
                                  color: Colors.grey,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Botón de reservar
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
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ReservaView(
                            lugar: lugar,
                            fechaLlegada: fechaLlegada,
                            fechaSalida: fechaSalida,
                          ),
                        ),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      minimumSize: const Size(double.infinity, 50),
                    ),
                    child: const Text(
                      'Reservar',
                      style: TextStyle(fontSize: 18),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildCaracteristica(IconData icon, String texto) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(icon, size: 24, color: Colors.grey.shade700),
          const SizedBox(width: 12),
          Text(texto, style: const TextStyle(fontSize: 16)),
        ],
      ),
    );
  }
}
