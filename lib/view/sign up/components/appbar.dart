import 'package:flutter/material.dart';
import 'package:eco_connect/view/common%20widgets/back_button.dart';

class SignUpBar extends StatelessWidget {
  const SignUpBar({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Row(
      children: [
        const CustomBackButton(),
        const SizedBox(width: 20),
        Text(
          'Sign up',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontSize: 30,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : Colors.black,
          ),
        ),
      ],
    );
  }
}
