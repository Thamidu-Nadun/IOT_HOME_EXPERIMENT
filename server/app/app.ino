#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <string>

// Wi-Fi credentials
const char* ssid = "my_network";
const char* password = "12345678";

AsyncWebServer server(80);

// Array class definition
class Array {
public:
    uint8_t currentSize = 0;
    uint8_t maxSize;
    uint8_t* data;

    void init(uint8_t max_size) {
        data = new uint8_t[max_size];
        maxSize = max_size;
    }

    void insertToEnd(uint8_t num) {
        if (currentSize < maxSize) {
            data[currentSize] = num;
            currentSize++;
        }
    }

    ~Array() {
        delete[] data;
    }
};

// LED class definition
class LED {
public:
    Array ledPins;

    LED() {
        ledPins.init(10); // Initialize array with a maximum size of 10
    }

    void addLED(uint8_t pin) {
        ledPins.insertToEnd(pin);
        pinMode(pin, OUTPUT);
        digitalWrite(pin, LOW); // Ensure the LED is off initially
    }

    void turnOn(uint8_t led_id) {
        for (uint8_t i = 0; i < ledPins.currentSize; i++) {
            if (led_id == ledPins.data[i]) {
                digitalWrite(ledPins.data[i], HIGH);
                return;
            }
        }
        Serial.println("Invalid LED ID");
    }

    void turnOff(uint8_t led_id) {
        for (uint8_t i = 0; i < ledPins.currentSize; i++) {
            if (led_id == ledPins.data[i]) {
                digitalWrite(ledPins.data[i], LOW);
                return;
            }
        }
        Serial.println("Invalid LED ID");
    }
};

LED ledManager;

// Handle CORS
void handleCORS(AsyncWebServerRequest* request) {
    request->send(204);
}

// Handle LED API requests
void handleLED(AsyncWebServerRequest* request) {
    if (!request->hasParam("id") || !request->hasParam("action")) {
        request->send(400, "text/plain", "Missing parameters");
        return;
    }

    String idParam = request->getParam("id")->value();
    String action = request->getParam("action")->value();
    uint8_t led_id = idParam.toInt();

    if (action == "turn_on") {
        ledManager.turnOn(led_id);
        request->send(200, "text/plain", "LED turned ON");
    } else if (action == "turn_off") {
        ledManager.turnOff(led_id);
        request->send(200, "text/plain", "LED turned OFF");
    } else {
        request->send(400, "text/plain", "Invalid action");
    }
}

void setup() {
    Serial.begin(115200);

    // Initialize Wi-Fi
    WiFi.softAP(ssid, password);
    Serial.println("Soft AP started");
    Serial.print("Soft AP IP Address: ");
    Serial.println(WiFi.softAPIP());

    // Initialize LED manager
    ledManager.addLED(2); // Add pin 2 as an LED

    // CORS preflight request
    server.on("/api/*", HTTP_OPTIONS, [](AsyncWebServerRequest* request) {
        request->send(204);
    });

    // Add CORS headers to all responses
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type");

    // API endpoints
    server.on("/api/led", HTTP_GET, handleLED);
    server.begin();
}

void loop() {
    // Nothing to do here
}
