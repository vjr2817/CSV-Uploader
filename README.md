
This repo is for CSV file upload functionality, and  view the CSV data with sorting and filter features with User login functionality built using Angular,Angular Material, Symfony.

To setup on local:

- Run using Docker **(Docker setup required https://docs.docker.com/desktop/)**
- Running Client and Server Applications

**To run by using Docker:**

Requirements:

  - Engine: 26.0.0
  - Compose: v2.26.1-desktop.1
    > Developed using Docker Desktop

  Steps to run using Docker setup:

  ```
    - git clone  https://github.com/vjr2817/csv-Uploader.git
    - cd CSV-Uploader/
    - docker compose up
  ```
</br>

**To run by setting up client and server:**

Requirements:

  - Node: 22.0.0
  - NPM: 10.2.4
  - Angular CLI: 17.3.6
  - PHP: 8.0.30
  - Composer: 2.7.4

 Steps to run Angular Client App:

  ```
    - git clone https://github.com/vjr2817/csv-uploader.git
    - cd csv-uploader/client
    - npm install
    - ng serve
  ```
App will be running on http://localhost:4200 (**use admin & admin as username and password**)


Steps to run Symfony PHP app:

  ```
    - git clone  https://github.com/vjr2817/csv-Uploader.git
    - cd csv-Uploader/server
    - composer install
    - php -S 127.0.0.1:8000 -t public/
  ```

App will be running on http://localhost:8000 

(**use admin & admin as username and password**)

![Login Page of Client App](https://github.com/vjr2817/CSV-Uploader/assets/135838955/a071e6c5-0ab9-433e-8f9d-a89ea7e4743d)


    



  
