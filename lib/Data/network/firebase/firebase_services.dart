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
      final String str = signUpController.email.value.text.toString();
      final String node = str.substring(0, str.indexOf('@'));
      database
          .ref('Accounts')
          .child(node)
          .set({
            'name': signUpController.name.value.text.toString(),
            'email': signUpController.email.value.text.toString(),
            'password': signUpController.password.value.text.toString(),
          })
          .then((value) {
            auth
                .createUserWithEmailAndPassword(
                  email: signUpController.email.value.text.toString(),
                  password: signUpController.password.value.text.toString(),
                )
                .then((value) {
                  UserPref.setUser(
                    signUpController.name.value.text.toString(),
                    signUpController.email.value.text.toString(),
                    signUpController.password.value.text.toString(),
                    node,
                    value.user!.uid.toString(),
                  );
                  Utils.showSnackBar(
                    'Sign up',
                    "Account is successfully created",
                    const Icon(Icons.done, color: Colors.white),
                  );
                  signUpController.setLoading(false);
                })
                .onError((error, stackTrace) {
                  Utils.showSnackBar(
                    'Error',
                    Utils.extractFirebaseError(error.toString()),
                    const Icon(Icons.done, color: Colors.white),
                  );
                  signUpController.setLoading(false);
                });
          })
          .onError((error, stackTrace) {
            Utils.showSnackBar(
              'Error',
              Utils.extractFirebaseError(error.toString()),
              const Icon(
                FontAwesomeIcons.triangleExclamation,
                color: Colors.red,
              ),
            );
            signUpController.setLoading(false);
          });
    } catch (e) {
      Utils.showSnackBar(
        'Error',
        Utils.extractFirebaseError(e.toString()),
        const Icon(FontAwesomeIcons.triangleExclamation, color: Colors.red),
      );
      signUpController.setLoading(true);
    }
  }

  static Future<void> loginAccount() async {
    try {
      signInController.setLoading(true);
      auth
          .signInWithEmailAndPassword(
            email: signInController.email.value.text.toString(),
            password: signInController.password.value.text.toString(),
          )
          .then((value) {
            String node = value.user!.email!.substring(
              0,
              value.user!.email!.indexOf('@'),
            );
            database
                .ref('Accounts')
                .child(node)
                .onValue
                .listen((event) {
                  UserPref.setUser(
                    event.snapshot.child('name').value.toString(),
                    event.snapshot.child('email').value.toString(),
                    event.snapshot.child('password').value.toString(),
                    node,
                    value.toString(),
                  );
                  Utils.showSnackBar(
                    'Sign up',
                    "Successfully Login.Welcome Back!",
                    const Icon(Icons.done, color: Colors.white),
                  );
                  signInController.setLoading(false);
                })
                .onError((error, stackTrace) {
                  Utils.showSnackBar(
                    'Error',
                    Utils.extractFirebaseError(error.toString()),
                    const Icon(
                      FontAwesomeIcons.triangleExclamation,
                      color: Colors.red,
                    ),
                  );
                  signInController.setLoading(false);
                });
          })
          .onError((error, stackTrace) {
            Utils.showSnackBar(
              'Error',
              Utils.extractFirebaseError(error.toString()),
              const Icon(
                FontAwesomeIcons.triangleExclamation,
                color: Colors.red,
              ),
            );
            signInController.setLoading(false);
          });
    } catch (e) {
      Utils.showSnackBar(
        'Error',
        Utils.extractFirebaseError(e.toString()),
        const Icon(FontAwesomeIcons.triangleExclamation, color: Colors.red),
      );
      signInController.setLoading(true);
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
        final String str = value.user!.email.toString();
        final String node = str.substring(0, str.indexOf('@'));
        await database.ref('Accounts').child(node).set({
          'name': value.user!.displayName,
          'email': value.user!.email,
        });

        Utils.showSnackBar(
          'Login',
          'Successfully Login',
          const Icon(Icons.done, color: Colors.white),
        );
        UserPref.setUser(
          value.user!.displayName ?? "",
          value.user!.email ?? "",
          "NOPASSWORD",
          node,
          value.user!.uid,
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
