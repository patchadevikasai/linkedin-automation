# LinkedIn Connection Automation 🚀

This project automates the process of sending connection requests on LinkedIn, specifically targeting HR recruiters. It uses **React** for the frontend, **Flask** for the backend, and **Selenium** for automating the LinkedIn web interface.

![Alt Text](https://github.com/patchadevikasai/linkedin-automation/blob/master/linkedin_automation.jpeg)



## Project Overview 💼

This project helps automate the process of sending connection requests on LinkedIn by targeting specific profiles (e.g., HR recruiters) based on a search query. Users can define the number of pages to scrape and let the application send connection requests automatically, thus optimizing the process of growing their LinkedIn network.

### Key Features:
- 🔍 Search for LinkedIn profiles based on a specific query (e.g., "HR recruiters").
- 📄 Define how many pages of profiles to scrape and automate the sending of connection requests.
- 🚀 Seamless automation with real-time feedback on progress.
- 🛠 Built with **React**, **Flask**, **Selenium**, and **Bootstrap** for a responsive user experience.



## Tech Stack 💻

- **Frontend**:
  - React.js ⚛️
  - React Bootstrap 🧰
  - Axios for API calls 📡
  - Font Awesome for icons 🎨

- **Backend**:
  - Flask 🐍
  - Selenium for web automation 🤖
  - Flask CORS for Cross-Origin requests 🔑
  - Python-dotenv for managing environment variables 🔐

- **Web Automation**:
  - Selenium WebDriver 🌐
  - ChromeDriver for browser automation 🚗

## Setup and Installation 🛠

### Prerequisites:
- [Node.js](https://nodejs.org/) (for frontend)
- [Python](https://www.python.org/downloads/) (for backend)
- [Google Chrome](https://www.google.com/chrome/) and [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/) (for Selenium)

### Steps to Set Up:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/linkedin-automation.git
    cd linkedin-automation
    ```

2. **Frontend Setup (React):**

    - Navigate to the `frontend` directory:
    
      ```bash
      cd frontend
      ```

    - Install dependencies:

      ```bash
      npm install
      ```

    - Build the React app:

      ```bash
      npm run build
      ```

3. **Backend Setup (Flask + Selenium):**

    - Navigate back to the root project directory:

      ```bash
      cd ..
      ```

    - Install Python dependencies:

      ```bash
      pip install -r requirements.txt
      ```

    - Create a `.env` file to store your LinkedIn credentials:

      ```text
      LINKEDIN_EMAIL=your_email@example.com
      LINKEDIN_PASSWORD=your_password
      ```

4. **Run the Project:**

    - Start the Flask backend server:

      ```bash
      python app.py
      ```

    - The React app will be served via Flask. Open your browser and go to [http://localhost:5000](http://localhost:5000).

## Usage 🚀

1. Open the application in your browser.
2. Enter a search query (e.g., "HR recruiters").
3. Specify the number of pages to scrape.
4. Click **Start Automation** to begin sending connection requests.
5. Track the progress and see how many connection requests have been sent successfully.



## Contributing 🤝

We welcome contributions! Here’s how you can help improve the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes (`git push origin feature/your-feature`).
5. Open a pull request to the main repository.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for exploring **LinkedIn Connection Automation**! 🎉
