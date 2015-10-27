## Android
To build the native library for android and release it follow these steps:
- go to `native/android/env`
- bump version in `lib/build.gradle`
- run `./gradlew install bintrayUpload`

If the output is `SUCCUSS` the new version will be available from jcenter
