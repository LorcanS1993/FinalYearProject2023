#include <Arduino.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"


#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>

#endif

// Insert your network credentials
#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define API_KEY "AIzaSyAz7X7ptzblcrEoLICDXHsYe3D5N19sW60"
#define DATABASE_URL "https://fir-connect1993-default-rtdb.europe-west1.firebasedatabase.app/"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

float AlcoValue = 0;
unsigned long start = 0;
float mgL = 0.00;
float floatValue = 0.00;

const int MQ3 = 34;
int red = 25;
int green = 26;
const int buzzer = 18; //buzzer to pin 18
const int buttonPin = 23; //Push button to begin alcohol test

// set the LCD number of columns and rows
int lcdColumns = 16;
int lcdRows = 2;
int buttonState = 0;

// set LCD address, number of columns and rows
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Calling null function to reset arduino using code without pressing the reset button.
void( * resetFunc)(void) = 0;

// 16 by 2 where each sixteen is made up of 8 into 5 bytes. These bytes shows each dot on LCD display
// Displays image in bytes and each dot of LCD is displayed using bytes.
// Exactly 8 byte data each image contain and this 8 byte represents one dot in the lcd out of 16
byte image1[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image2[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image3[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image4[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image5[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image6[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image7[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image8[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image9[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image10[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image11[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};
byte image12[8] = {
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111,
  B11111
};

void loadingscreen() {
  lcd.setCursor(0, 1);
  lcd.write(byte(0));
  lcd.setCursor(12, 1);
  lcd.print("10");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(1, 1);
  lcd.write(byte(1));
  lcd.setCursor(12, 1);
  lcd.print("20");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(2, 1);
  lcd.write(byte(2));
  lcd.setCursor(12, 1);
  lcd.print("30");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(3, 1);
  lcd.write(byte(3));
  lcd.setCursor(12, 1);
  lcd.print("40");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(4, 1);
  lcd.write(byte(4));
  lcd.setCursor(12, 1);
  lcd.print("50");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(5, 1);
  lcd.write(byte(5));
  lcd.setCursor(12, 1);
  lcd.print("60");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(6, 1);
  lcd.write(byte(6));
  lcd.setCursor(12, 1);
  lcd.print("70");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(7, 1);
  lcd.write(byte(7));
  lcd.setCursor(12, 1);
  lcd.print("80");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(8, 1);
  lcd.write(byte(8));
  lcd.setCursor(12, 1);
  lcd.print("85");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(9, 1);
  lcd.write(byte(9));
  lcd.setCursor(12, 1);
  lcd.print("90");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(10, 1);
  lcd.write(byte(10));
  lcd.setCursor(12, 1);
  lcd.print("95");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);

  lcd.setCursor(11, 1);
  lcd.write(byte(11));
  lcd.setCursor(12, 1);
  lcd.print("100");
  lcd.setCursor(15, 1);
  lcd.print('%');
  delay(1000);
  lcd.clear();
}

void setup() {
  // initialize LCD
  lcd.begin();
  lcd.backlight();
  Serial.begin(9600);

  // Connect to Wi-Fi network
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi...");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
    
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
    Serial.printf("Authenticating");
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
 struct tm timeinfo;
while (!getLocalTime(&timeinfo)) {
  Serial.println("Setting time zone");
  configTime(3600, 3600, "pool.ntp.org");  // change accordingly to your timezone
}

  Firebase.begin( & config, & auth);
  Firebase.reconnectWiFi(true);

  pinMode(MQ3, INPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);

  // Creates each image on LCD display
  lcd.createChar(0, image1);
  lcd.createChar(1, image2);
  lcd.createChar(2, image3);
  lcd.createChar(3, image4);
  lcd.createChar(4, image5);
  lcd.createChar(5, image6);
  lcd.createChar(6, image7);
  lcd.createChar(7, image8);
  lcd.createChar(8, image9);
  lcd.createChar(9, image10);
  lcd.createChar(10, image11);
  lcd.createChar(11, image12);

  //noTone(buzzer);
  //tone(buzzer, 0);
  lcd.setCursor(0, 0);
  lcd.print("MQ3 Starting...");
  loadingscreen();
  digitalWrite(green, LOW);
  digitalWrite(red, LOW);
}

void loop() {
  /* Code reads the button and I added a delay of 1 second that and each second calculate the result of sensor
  // the seconds are stored in start, when seconds reaches 5 seconds using an IF statement and display the results */
  buttonState = digitalRead(buttonPin);
  if (buttonState == LOW) // // checking to see If pushbutton is pressed
  {
    delay(1000);
    start++;
    Serial.println(start);
    for (int i = 0; i < 5; i++) {
      AlcoValue = analogRead(MQ3);
      delay(10);
    }

    // Converting the value, in the range from 0 to 1023, to a value in the range of 0 to 5.0, which is the range of voltages that is read on analog pin.
    float v = (AlcoValue / 10) * (5.0 / 1024.0);
    /* Alcohol content in clean air is 0.04 mg/L, according to the MQ3 datasheet. I believe my room has clear air, which translates to a 0.60 voltage.
    It indicates that when the sensor outputs 0.60 volts in clean air, alcohol concentration will be 0.04 milligrams per litre
    I get 0.67 (Rounded) when I divide alcohol from the MQ3 datasheet by output voltage in clean air */
    float mgL = 0.67 * v;
    Serial.println(mgL);

    if (Firebase.RTDB.setFloat( & fbdo, "/AlcoholTest/mgL", mgL)) {
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
      if (fbdo.dataType() == "mgL") {
        floatValue = fbdo.floatData();
        Serial.println(floatValue);
      }
    } else {
      Serial.println("FAILED");
      Serial.println(fbdo.errorReason());
    }

    if (start == 5) {
      // Display BAC value on LCD
      lcd.clear();
      lcd.setCursor(0,0);
      lcd.print("Results Calc...");
      loadingscreen();
      lcd.clear();
      
      lcd.setCursor(0, 0);
      lcd.print("BAC: ");
      lcd.print(mgL, 4);
      lcd.print(" mg/L ");
      lcd.setCursor(0, 1);

      // Display pass/fail message on LCD and serial monitor
      if (mgL > 0.5) {
        lcd.print("FAILED!! ");
        Serial.println(F(" Drunk! PLEASE DO NOT DRIVE!"));
        digitalWrite(buzzer, HIGH);
        //tone(buzzer, 1000);
        delay(1000);
        digitalWrite(red, HIGH);
        delay(10000);
        //noTone(buzzer);
        //tone(buzzer, 0);
        digitalWrite(red, LOW);
        lcd.clear();
      } else {
        lcd.print("PASSED ");
        Serial.println(F(" Normal"));
        digitalWrite(green, HIGH);
        delay(10000);
        digitalWrite(green, LOW);
        lcd.clear();
      }
      // Reset the board
      delay(3000);
      resetFunc();
    }
  }
}
