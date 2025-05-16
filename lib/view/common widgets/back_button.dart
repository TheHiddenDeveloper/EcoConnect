import 'package:flutter/material.dart';

class CustomBackButton extends StatelessWidget {
  const CustomBackButton({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
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
        Icons.arrow_back_ios_new_rounded,
        color: theme.colorScheme.onPrimary.withOpacity(0.7),
        size: 18,
      ),
    );
  }
}
