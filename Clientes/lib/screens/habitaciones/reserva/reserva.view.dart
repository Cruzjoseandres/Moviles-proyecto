import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'reserva.viewmodel.dart';
import '../../../models/lugar.dart';

class ReservaView extends StatelessWidget {
  final Lugar lugar;
  final String fechaLlegada;
  final String fechaSalida;

  const ReservaView({
    super.key,
    required this.lugar,
    required this.fechaLlegada,
    required this.fechaSalida,
  });

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ReservaViewModel(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Confirmar Reserva'),
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
        ),
        body: Consumer<ReservaViewModel>(
          builder: (context, viewModel, child) {
            final noches = fechaSalida.difference(fechaLlegada).inDays;
            final precioNoches = viewModel.calcularPrecioNoches(
              lugar,
              fechaLlegada,
              fechaSalida,
            );
            final precioServicio = viewModel.calcularPrecioServicio(
              precioNoches,
            );
            final precioTotal = viewModel.calcularPrecioTotal(
              lugar,
              fechaLlegada,
              fechaSalida,
            );

            return Column(
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Información del lugar
                        Card(
                          elevation: 4,
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              children: [
                                if (lugar.fotos.isNotEmpty)
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                    child: Image.network(
                                      lugar.fotos.first,
                                      width: 80,
                                      height: 80,
                                      fit: BoxFit.cover,
                                      errorBuilder:
                                          (context, error, stackTrace) {
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
                                const SizedBox(width: 16),
                                Expanded(
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
                                      const SizedBox(height: 4),
                                      Text(
                                        lugar.ciudad,
                                        style: TextStyle(
                                          color: Colors.grey.shade600,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        // Fechas
                        Card(
                          elevation: 4,
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Fechas',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 12),
                                Row(
                                  children: [
                                    const Icon(Icons.calendar_today),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const Text(
                                            'Llegada',
                                            style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.grey,
                                            ),
                                          ),
                                          Text(
                                            DateFormat(
                                              'dd/MM/yyyy',
                                            ).format(fechaLlegada),
                                            style: const TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    const Icon(Icons.arrow_forward),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const Text(
                                            'Salida',
                                            style: TextStyle(
                                              fontSize: 12,
                                              color: Colors.grey,
                                            ),
                                          ),
                                          Text(
                                            DateFormat(
                                              'dd/MM/yyyy',
                                            ).format(fechaSalida),
                                            style: const TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 12),
                                Text(
                                  '$noches noche${noches != 1 ? 's' : ''}',
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey.shade700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        // Desglose de precios
                        Card(
                          elevation: 4,
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                const Text(
                                  'Desglose de Precios',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 16),
                                _buildPrecioFila(
                                  '\$${lugar.precioNoche.toStringAsFixed(2)} x $noches noche${noches != 1 ? 's' : ''}',
                                  '\$${precioNoches.toStringAsFixed(2)}',
                                ),
                                const SizedBox(height: 12),
                                _buildPrecioFila(
                                  'Costo de limpieza',
                                  '\$${lugar.costoLimpieza.toStringAsFixed(2)}',
                                ),
                                const SizedBox(height: 12),
                                _buildPrecioFila(
                                  'Tarifa de servicio (10%)',
                                  '\$${precioServicio.toStringAsFixed(2)}',
                                ),
                                const Divider(height: 24),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text(
                                      'Total',
                                      style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Text(
                                      '\$${precioTotal.toStringAsFixed(2)}',
                                      style: const TextStyle(
                                        fontSize: 24,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.blue,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                        if (viewModel.errorMessage != null) ...[
                          const SizedBox(height: 20),
                          Card(
                            color: Colors.red.shade50,
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Text(
                                viewModel.errorMessage!,
                                style: const TextStyle(
                                  color: Colors.red,
                                  fontSize: 14,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                // Botón de confirmar
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
                    onPressed: viewModel.isLoading
                        ? null
                        : () async {
                            final success = await viewModel.confirmarReserva(
                              lugar,
                              fechaLlegada,
                              fechaSalida,
                            );
                            if (success && context.mounted) {
                              showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  title: const Text('¡Reserva Exitosa!'),
                                  content: const Text(
                                    'Tu reserva ha sido confirmada correctamente.',
                                  ),
                                  actions: [
                                    TextButton(
                                      onPressed: () {
                                        // Volver a la pantalla de búsqueda
                                        Navigator.of(
                                          context,
                                        ).popUntil((route) => route.isFirst);
                                      },
                                      child: const Text('Aceptar'),
                                    ),
                                  ],
                                ),
                              );
                            }
                          },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      minimumSize: const Size(double.infinity, 50),
                    ),
                    child: viewModel.isLoading
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                              strokeWidth: 2,
                            ),
                          )
                        : const Text(
                            'Confirmar Reserva',
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

  Widget _buildPrecioFila(String concepto, String precio) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(concepto, style: const TextStyle(fontSize: 16)),
        Text(
          precio,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
        ),
      ],
    );
  }
}
