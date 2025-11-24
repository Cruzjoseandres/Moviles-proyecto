import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'resultados.viewmodel.dart';
import '../../../models/lugar.dart';
import '../mapa/mapa.view.dart';
import '../../habitaciones/detalle/detalle.view.dart';

class ResultadosView extends StatelessWidget {
  final List<Lugar> lugares;
  final DateTime fechaLlegada;
  final DateTime fechaSalida;

  const ResultadosView({
    super.key,
    required this.lugares,
    required this.fechaLlegada,
    required this.fechaSalida,
  });

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ResultadosViewModel(),
      child: Scaffold(
        appBar: AppBar(
          title: Text('${lugares.length} Lugares Encontrados'),
        ),
        body: Consumer<ResultadosViewModel>(
          builder: (context, viewModel, child) {
            if (viewModel.verMapa) {
              return MapaView(
                lugares: lugares,
                fechaLlegada: fechaLlegada,
                fechaSalida: fechaSalida,
                onVolverLista: () => viewModel.toggleVista(),
              );
            }

            return Column(
              children: [
                Expanded(
                  child: lugares.isEmpty
                      ? const Center(
                          child: Text(
                            'No se encontraron lugares',
                            style: TextStyle(fontSize: 16),
                          ),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: lugares.length,
                          itemBuilder: (context, index) {
                            final lugar = lugares[index];
                            return Card(
                              elevation: 4,
                              margin: const EdgeInsets.only(bottom: 16),
                              child: InkWell(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => DetalleView(
                                        lugarId: lugar.id,
                                        fechaLlegada: fechaLlegada,
                                        fechaSalida: fechaSalida,
                                      ),
                                    ),
                                  );
                                },
                                child: Column(
                                  crossAxisAlignment:
                                      CrossAxisAlignment.stretch,
                                  children: [
                                    if (lugar.fotos.isNotEmpty)
                                      Image.network(
                                        lugar.fotos.first,
                                        height: 200,
                                        fit: BoxFit.cover,
                                        errorBuilder:
                                            (context, error, stackTrace) {
                                          return Container(
                                            height: 200,
                                            color: Colors.grey.shade300,
                                            child: const Icon(
                                              Icons.home,
                                              size: 80,
                                              color: Colors.grey,
                                            ),
                                          );
                                        },
                                      )
                                    else
                                      Container(
                                        height: 200,
                                        color: Colors.grey.shade300,
                                        child: const Icon(
                                          Icons.home,
                                          size: 80,
                                          color: Colors.grey,
                                        ),
                                      ),
                                    Padding(
                                      padding: const EdgeInsets.all(16),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            lugar.nombre,
                                            style: const TextStyle(
                                              fontSize: 18,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          const SizedBox(height: 8),
                                          Text(
                                            lugar.descripcion,
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                          const SizedBox(height: 8),
                                          Text(
                                              '${lugar.cantPersonas} personas'),
                                          const SizedBox(height: 8),
                                          Text(
                                            '\$${lugar.precioNoche.toStringAsFixed(2)} por noche',
                                            style: const TextStyle(
                                              fontSize: 18,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
                if (lugares.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: ElevatedButton(
                      onPressed: () => viewModel.toggleVista(),
                      child: const Text('Ver Mapa'),
                    ),
                  ),
              ],
            );
          },
        ),
      ),
    );
  }
}
