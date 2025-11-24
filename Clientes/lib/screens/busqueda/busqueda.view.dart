import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'busqueda.viewmodel.dart';
import 'resultados/resultados.view.dart';
import '../habitaciones/mis_reservas/mis_reservas.view.dart';

class BusquedaView extends StatelessWidget {
  const BusquedaView({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => BusquedaViewModel(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Buscar Alojamiento'),
          automaticallyImplyLeading: false,
          actions: [
            IconButton(
              icon: const Icon(Icons.history),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const MisReservasView(),
                  ),
                );
              },
            ),
          ],
        ),
        body: Consumer<BusquedaViewModel>(
          builder: (context, viewModel, child) {
            return SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  TextField(
                    controller: viewModel.ciudadController,
                    decoration: const InputDecoration(
                      labelText: 'Ciudad *',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: InkWell(
                          onTap: () async {
                            final fecha = await showDatePicker(
                              context: context,
                              initialDate:
                                  viewModel.fechaLlegada ?? DateTime.now(),
                              firstDate: DateTime.now(),
                              lastDate:
                                  DateTime.now().add(const Duration(days: 365)),
                            );
                            if (fecha != null) {
                              viewModel.setFechaLlegada(fecha);
                            }
                          },
                          child: InputDecorator(
                            decoration: const InputDecoration(
                              labelText: 'Fecha de llegada *',
                              border: OutlineInputBorder(),
                            ),
                            child: Text(
                              viewModel.fechaLlegada != null
                                  ? DateFormat('dd/MM/yyyy')
                                      .format(viewModel.fechaLlegada!)
                                  : 'Seleccionar',
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: InkWell(
                          onTap: () async {
                            final fecha = await showDatePicker(
                              context: context,
                              initialDate: viewModel.fechaSalida ??
                                  DateTime.now().add(const Duration(days: 1)),
                              firstDate:
                                  viewModel.fechaLlegada ?? DateTime.now(),
                              lastDate:
                                  DateTime.now().add(const Duration(days: 365)),
                            );
                            if (fecha != null) {
                              viewModel.setFechaSalida(fecha);
                            }
                          },
                          child: InputDecorator(
                            decoration: const InputDecoration(
                              labelText: 'Fecha de salida *',
                              border: OutlineInputBorder(),
                            ),
                            child: Text(
                              viewModel.fechaSalida != null
                                  ? DateFormat('dd/MM/yyyy')
                                      .format(viewModel.fechaSalida!)
                                  : 'Seleccionar',
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: viewModel.huespedesController,
                    decoration: const InputDecoration(
                      labelText: 'Cantidad de huéspedes *',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.number,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      viewModel.toggleBusquedaAvanzada();
                    },
                    child: Text(
                      viewModel.isBusquedaAvanzada
                          ? 'Ocultar Filtros'
                          : 'Mostrar Filtros',
                    ),
                  ),
                  if (viewModel.isBusquedaAvanzada) ...[
                    const SizedBox(height: 16),
                    TextField(
                      controller: viewModel.camasController,
                      decoration: const InputDecoration(
                        labelText: 'Cantidad de camas',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.number,
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: viewModel.baniosController,
                      decoration: const InputDecoration(
                        labelText: 'Cantidad de baños',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.number,
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: viewModel.habitacionesController,
                      decoration: const InputDecoration(
                        labelText: 'Cantidad de habitaciones',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.number,
                    ),
                    const SizedBox(height: 16),
                    SwitchListTile(
                      title: const Text('Tiene Wi-Fi'),
                      value: viewModel.tieneWifi,
                      onChanged: (value) {
                        viewModel.setTieneWifi(value);
                      },
                    ),
                    SwitchListTile(
                      title: const Text('Tiene Parqueo'),
                      value: viewModel.tieneParqueo,
                      onChanged: (value) {
                        viewModel.setTieneParqueo(value);
                      },
                    ),
                  ],
                  const SizedBox(height: 20),
                  if (viewModel.errorMessage != null)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: Text(
                        viewModel.errorMessage!,
                        style: const TextStyle(color: Colors.red),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ElevatedButton(
                    onPressed: viewModel.isLoading
                        ? null
                        : () async {
                            final success = await viewModel.buscar();
                            if (success && context.mounted) {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => ResultadosView(
                                    lugares: viewModel.lugares,
                                    fechaLlegada: viewModel.fechaLlegada!,
                                    fechaSalida: viewModel.fechaSalida!,
                                  ),
                                ),
                              );
                            }
                          },
                    child: viewModel.isLoading
                        ? const CircularProgressIndicator()
                        : const Text('Buscar'),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
