import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:eco_connect/Data/shared%20pref/shared_pref.dart';
import 'package:eco_connect/utils/utils.dart';
import 'package:eco_connect/view%20model/controller/signin_controller.dart';
import '../../../view model/controller/signup_controller.dart';
import 'package:google_sign_in/google_sign_in.dart';

class FirebaseServices {
  static final FirebaseAuth auth = FirebaseAuth.instance;
  static final FirebaseDatabase database = FirebaseDatabase.instance;
  static final signInController = Get.put(SignInController());
  static final signUpController = Get.put(SignupController());

  static Future<void> createAccount() async {
    try {
      signUpController.setLoading(true);
      final String name = signUpController.name.value.text.trim();
      final String email = signUpController.email.value.text.trim();
      final String password = signUpController.password.value.text.trim();

      // 1. Create Auth user first
      final userCredential = await auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      final String uid = userCredential.user!.uid;

      // 2. Save profile info in database (no password)
      await database.ref('Accounts').child(uid).set({
        'name': name,
        'email': email,
      });

      UserPref.setUser(name, email, uid);
      Utils.showSnackBar(
        'Sign up',
        "Account is successfully created",
        const Icon(Icons.done, color: Colors.white),
      );
      signUpController.setLoading(false);
    } catch (e) {
      Utils.showSnackBar(
        'Error',
        Utils.extractFirebaseError(e.toString()),
        const Icon(FontAwesomeIcons.triangleExclamation, color: Colors.red),
      );
      signUpController.setLoading(false);
    }
  }

  static Future<void> loginAccount() async {
    try {
      signInController.setLoading(true);
      final String email = signInController.email.value.text.trim();
      final String password = signInController.password.value.text.trim();

      // 1. Sign in with Auth
      final userCredential = await auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      final String uid = userCredential.user!.uid;

      // 2. Get user profile from database
      final snapshot = await database.ref('Accounts').child(uid).get();
      if (snapshot.exists) {
        final name = snapshot.child('name').value?.toString() ?? "";
        final emailDb = snapshot.child('email').value?.toString() ?? "";

        UserPref.setUser(name, emailDb, uid);

        Utils.showSnackBar(
          'Login',
          "Successfully Login. Welcome Back!",
          const Icon(Icons.done, color: Colors.white),
        );
      } else {
        Utils.showSnackBar(
          'Error',
          "User profile not found in database.",
          const Icon(FontAwesomeIcons.triangleExclamation, color: Colors.red),
        );
      }
      signInController.setLoading(false);
    } catch (e) {
      Utils.showSnackBar(
        'Error',
        Utils.extractFirebaseError(e.toString()),
        const Icon(FontAwesomeIcons.triangleExclamation, color: Colors.red),
      );
      signInController.setLoading(false);
    }
  }

  static Future<void> signInWithGoogle() async {
    try {
      final GoogleSignIn googleSignIn = GoogleSignIn();
      final GoogleSignInAccount? googleSignInAccount =
          await googleSignIn.signIn();
      if (googleSignInAccount != null) {
        final GoogleSignInAuthentication googleSignInAuthentication =
            await googleSignInAccount.authentication;
        final AuthCredential credential = GoogleAuthProvider.credential(
          idToken: googleSignInAuthentication.idToken,
          accessToken: googleSignInAuthentication.accessToken,
        );

        final value = await auth.signInWithCredential(credential);
        final String uid = value.user!.uid;

        // Save or update user profile in database
        await database.ref('Accounts').child(uid).set({
          'name': value.user!.displayName ?? "",
          'email': value.user!.email ?? "",
        });

        Utils.showSnackBar(
          'Login',
          'Successfully Login',
          const Icon(Icons.done, color: Colors.white),
        );
        UserPref.setUser(
          value.user!.displayName ?? "",
          value.user!.email ?? "",
          uid,
        );
      }
    } catch (e) {
      Utils.showSnackBar(
        'Error',
        Utils.extractFirebaseError(e.toString()),
        const Icon(FontAwesomeIcons.triangleExclamation, color: Colors.red),
      );
    }
  }

  static Future<void> signInWithApple() async {}
}
