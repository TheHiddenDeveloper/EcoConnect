import 'package:flutter/material.dart';
import 'package:eco_connect/view/permission screen/components/permission_card.dart';
import 'package:eco_connect/view/permission screen/components/tick_component.dart';
import 'package:eco_connect/view/permission screen/components/permission_button.dart';
import 'package:eco_connect/view/common widgets/back_button.dart';

class PermissionBody extends StatelessWidget {
  final VoidCallback onRequest;
  final Map<String, bool> permissionStatus;
  const PermissionBody({
    super.key,
    required this.onRequest,
    required this.permissionStatus,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Align(alignment: Alignment.centerLeft, child: CustomBackButton()),
        const SizedBox(height: 16),
        PermissionCard(
          child: Column(
            children: [
              Icon(Icons.security, size: 60, color: theme.colorScheme.primary),
              const SizedBox(height: 16),
              Text(
                "Permissions Required",
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: theme.colorScheme.primary,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                "EcoConnect needs access to:",
                style: theme.textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              _PermissionRow(
                label: "Camera",
                granted: permissionStatus["Camera"] ?? false,
                icon: Icons.camera_alt,
              ),
              _PermissionRow(
                label: "Location",
                granted: permissionStatus["Location"] ?? false,
                icon: Icons.location_on,
              ),
              _PermissionRow(
                label: "Storage",
                granted: permissionStatus["Storage"] ?? false,
                icon: Icons.storage,
              ),
              _PermissionRow(
                label: "Network & Internet",
                granted: true,
                icon: Icons.wifi,
              ), // Always true
              const SizedBox(height: 24),
              PermissionButton(onPressed: onRequest, text: "Allow Permissions"),
            ],
          ),
        ),
      ],
    );
  }
}

class _PermissionRow extends StatelessWidget {
  final String label;
  final bool granted;
  final IconData icon;
  const _PermissionRow({
    required this.label,
    required this.granted,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListTile(
      leading: Icon(icon, color: theme.colorScheme.primary),
      title: Text(label, style: theme.textTheme.bodyLarge),
      trailing: TickIcon(granted: granted),
      dense: true,
      visualDensity: VisualDensity.compact,
    );
  }
}
