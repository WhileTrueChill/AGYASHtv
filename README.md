# AGYASH TV

AGYASH TV marketing website with Google sign-in powered by Firebase Authentication.

## Enable Google sign-in

1. Open the [Firebase Console](https://console.firebase.google.com/) and create a Firebase project.
2. In **Project settings → General → Your apps**, add a **Web app** and copy its Firebase configuration.
3. In **Build → Authentication → Sign-in method**, enable **Google** and save.
4. In **Authentication → Settings → Authorized domains**, add `agyas-htv.vercel.app`. Add any other production domain used by the website as well.
5. In the Vercel project serving this repository, open **Settings → Environment Variables** and add these variables for **Production**:

   | Variable | Firebase Web app config value |
   | --- | --- |
   | `FIREBASE_API_KEY` | `apiKey` |
   | `FIREBASE_AUTH_DOMAIN` | `authDomain` |
   | `FIREBASE_PROJECT_ID` | `projectId` |
   | `FIREBASE_APP_ID` | `appId` |

6. Redeploy the Vercel project. Open the website and click **Sign In → Continue with Google**.

The Firebase web configuration is public client configuration; it does not include a service-account private key. Never put Firebase Admin SDK credentials or private service-account JSON in these variables or in the website.

The website exposes the public Firebase web configuration through `/api/firebase-config`. If the four Vercel variables are missing, that endpoint returns HTTP 503 with a setup message.

## What Google sign-in does

Google sign-in authenticates a visitor and displays their Google name, email, and profile photo in the account modal. It does not by itself activate an IPTV subscription, create Xtream Codes credentials, take payment, or grant streaming access. Those require a separate subscription/account integration.

## Other website API

`/api/trending` serves trending movie and TV data using the server-side `TMDB_API_KEY` environment variable.
