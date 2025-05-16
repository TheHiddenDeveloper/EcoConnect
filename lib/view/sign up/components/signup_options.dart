import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:eco_connect/Data/network/firebase/firebase_services.dart';

import 'icon_container.dart';

class SignUpOptions extends StatelessWidget {
  const SignUpOptions({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        GestureDetector(
          onTap: () => FirebaseServices.signInWithGoogle(),
          child: IconContainer(
            widget: Icon(
              FontAwesomeIcons.google,
              size: 18,
              color: theme.colorScheme.onPrimary,
            ),
          ),
        ),
        IconContainer(
          widget: Icon(Icons.apple_rounded, color: theme.colorScheme.onPrimary),
        ),
      ],
    );
  }
}
