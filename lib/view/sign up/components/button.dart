import 'package:flutter/material.dart';

class AccountButton extends StatelessWidget {
  final String text;
  final bool loading;
  final VoidCallback onTap;
  final String? tag;
  const AccountButton({
    super.key,
    required this.text,
    required this.loading,
    required this.onTap,
    this.tag,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Hero(
      tag: tag ?? "TAG",
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          height: 65,
          width: double.infinity,
          alignment: Alignment.center,
          margin: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
            gradient: LinearGradient(
              colors: [theme.colorScheme.primary, theme.colorScheme.secondary],
            ),
          ),
          child:
              loading
                  ? const SizedBox(
                    height: 15,
                    width: 15,
                    child: CircularProgressIndicator(color: Colors.white),
                  )
                  : Material(
                    color: Colors.transparent,
                    child: Text(
                      text,
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
        ),
      ),
    );
  }
}
