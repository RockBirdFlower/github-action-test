pipeline {
    agent any
    tools {
        nodejs 'node18'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Done') {
            steps {
                echo 'All tests passed!'
            }
        }
    }
}