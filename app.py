import os
import time
import threading
from flask import Flask, send_from_directory, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
LINKEDIN_EMAIL = os.getenv("LINKEDIN_EMAIL")
LINKEDIN_PASSWORD = os.getenv("LINKEDIN_PASSWORD")

# Initialize Flask app
app = Flask(__name__, static_folder=os.path.join(os.getcwd(), 'frontend', 'build', 'static'), static_url_path='/static')
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Selenium login function
def linkedin_login(driver):
    driver.get("https://www.linkedin.com/login")
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username"))).send_keys(LINKEDIN_EMAIL)
        password_field = driver.find_element(By.ID, "password")
        password_field.send_keys(LINKEDIN_PASSWORD)
        password_field.send_keys(Keys.RETURN)
        time.sleep(5)
    except Exception as e:
        print(f"Error logging in: {e}")

# Function to search for HR recruiters
def search_hr_recruiters(driver, search_query):
    try:
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[contains(@placeholder, 'Search')]"))
        )
        search_box.clear()
        search_box.send_keys(search_query)
        search_box.send_keys(Keys.RETURN)
        time.sleep(5)

        people_tab = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='People']"))
        )
        people_tab.click()
        time.sleep(5)
    except Exception as e:
        print(f"Error in search: {e}")

# Function to send connection requests
def send_connection_requests(search_query, max_pages=3):
    driver = webdriver.Chrome()
    linkedin_login(driver)
    search_hr_recruiters(driver, search_query)

    total_requests_sent = 0

    for page in range(1, max_pages + 1):
        requests_sent = 0
        connect_buttons = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//span[text()='Connect']/ancestor::button"))
        )
        for button in connect_buttons:
            try:
                driver.execute_script("arguments[0].click();", button)
                time.sleep(2)
                send_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, "//span[text()='Send without a note']/ancestor::button"))
                )
                send_button.click()
                time.sleep(2)
                requests_sent += 1
            except Exception as e:
                print(f"Error clicking connect button: {e}")
        
        total_requests_sent += requests_sent
        time.sleep(2)

    driver.quit()
    return total_requests_sent

@app.route('/start', methods=['POST'])
def start_selenium():
    data = request.get_json()
    search_query = data.get("query", "HR recruiters")
    max_pages = int(data.get("max_pages", 3))

    def automation_thread():
        total_requests_sent = send_connection_requests(search_query, max_pages)
        return total_requests_sent

    thread = threading.Thread(target=automation_thread)
    thread.start()
    thread.join()

    total_requests_sent = automation_thread()  # Get the total requests sent
    return jsonify({"message": f"Automation started for '{search_query}' with {max_pages} pages! Total requests sent: {total_requests_sent}"})

# Serve React build
@app.route('/')
def serve_react_app():
    build_dir = os.path.join(os.getcwd(), 'frontend', 'build')
    print(f"Serving React app from: {build_dir}")
    try:
        return send_from_directory(build_dir, 'index.html')
    except FileNotFoundError:
        return jsonify({"error": "React build not found. Ensure you've run 'npm run build' first."}), 404

# Catch-all route for React routing
@app.route('/<path:path>', methods=['GET'])
def catch_all(path):
    build_dir = os.path.join(os.getcwd(), 'frontend', 'build')
    print(f"Serving React catch-all route from: {build_dir}")
    try:
        return send_from_directory(build_dir, 'index.html')
    except FileNotFoundError:
        return jsonify({"error": "React build not found. Ensure you've run 'npm run build' first."}), 404

if __name__ == '__main__':
    # Serve React build when Flask runs in production mode
    app.run(debug=True, host='0.0.0.0', port=5000)
