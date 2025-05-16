import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:eco_connect/view%20model/controller/signin_controller.dart';
import 'package:eco_connect/view%20model/controller/signup_controller.dart';
import 'package:eco_connect/view/sign%20up/components/textfield_sufiix.dart';

class InputField extends StatelessWidget {
  InputField({
    super.key,
    required this.onTap,
    required this.focus,
    required this.hint,
    required this.controller,
    this.correct,
    required this.onChange,
    this.hideText,
    this.showPass,
  });

  final bool focus;
  final String hint;
  final TextEditingController controller;
  final VoidCallback onTap;
  final VoidCallback onChange;
  final VoidCallback? showPass;
  final bool? hideText;
  final bool? correct;
  final _signUpController = Get.put(SignupController());
  final _signInController = Get.put(SignInController());

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return AnimatedContainer(
      duration: const Duration(milliseconds: 500),
      padding: const EdgeInsets.all(1),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        gradient:
            focus
                ? LinearGradient(
                  colors: [
                    theme.colorScheme.primary,
                    theme.colorScheme.secondary,
                  ],
                )
                : null,
      ),
      child: TextFormField(
        controller: controller,
        onTap: onTap,
        onTapOutside: (event) {
          _signUpController.onTapOutside(context);
          _signInController.onTapOutside(context);
        },
        onChanged: (value) {
          onChange();
        },
        obscureText: hideText ?? false,
        style: TextStyle(
          color: theme.colorScheme.onPrimary,
          fontWeight: FontWeight.bold,
        ),
        decoration: InputDecoration(
          filled: true,
          suffixIcon:
              hideText == null
                  ? correct == true
                      ? const TextFieldSufix(icon: Icons.done)
                      : null
                  : _signUpController.password.value.text.toString().isNotEmpty
                  ? GestureDetector(
                    onTap: showPass,
                    child:
                        hideText!
                            ? const TextFieldSufix(
                              icon: FontAwesomeIcons.eye,
                              size: 13,
                            )
                            : const TextFieldSufix(
                              icon: FontAwesomeIcons.eyeLowVision,
                              size: 13,
                            ),
                  )
                  : const SizedBox(),
          fillColor: theme.colorScheme.primary.withOpacity(0.1),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(15),
            borderSide: BorderSide.none,
          ),
          hoverColor: theme.colorScheme.secondary.withOpacity(0.2),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 30,
            vertical: 20,
          ),
          hintText: hint,
          hintStyle: TextStyle(
            color: theme.colorScheme.onPrimary.withOpacity(0.5),
            fontWeight: FontWeight.normal,
            fontSize: 12,
          ),
        ),
      ),
    );
  }
}
