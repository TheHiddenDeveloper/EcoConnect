import 'package:flutter/material.dart';

class TextFieldSufix extends StatelessWidget {
  const TextFieldSufix({super.key, required this.icon, this.size = 18});
  final IconData icon;
  final double size;
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      child: Container(
        height: 40,
        width: 40,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: theme.colorScheme.primary,
          boxShadow: [
            BoxShadow(
              color: theme.colorScheme.secondary.withOpacity(0.2),
              offset: const Offset(1, 0),
            ),
            BoxShadow(
              color: theme.colorScheme.secondary.withOpacity(0.2),
              offset: const Offset(0, 1),
            ),
            BoxShadow(
              color: theme.colorScheme.secondary.withOpacity(0.2),
              offset: const Offset(-1, 0),
            ),
            BoxShadow(
              color: theme.colorScheme.secondary.withOpacity(0.2),
              offset: const Offset(0, -1),
            ),
          ],
        ),
        child: Icon(
          icon,
          color: theme.colorScheme.onPrimary.withOpacity(0.7),
          size: size,
        ),
      ),
    );
  }
}
