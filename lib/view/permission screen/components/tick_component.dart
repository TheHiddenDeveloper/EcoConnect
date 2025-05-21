import 'package:flutter/material.dart';

class TickIcon extends StatelessWidget {
  final bool granted;
  const TickIcon({super.key, required this.granted});

  @override
  Widget build(BuildContext context) {
    return Icon(
      granted ? Icons.check_circle : Icons.radio_button_unchecked,
      color: granted ? Colors.green : Colors.grey,
      size: 24,
    );
  }
}