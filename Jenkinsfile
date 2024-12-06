pipeline {
    agent any
    stages {
        stage('Instalar Dependencias') {
            steps {
                script {
                    // Instalar dependencias usando npm
                    sh 'npm install'
                }
            }
        }
        stage('Construir Proyecto') {
            steps {
                script {
                    // Ejecutar scripts de build si es necesario
                    sh 'npm run build'  // Asegúrate de tener un script de build en package.json
                }
            }
        }
        stage('Ejecutar Pruebas') {
            steps {
                script {
                    // Ejecutar pruebas del backend
                    sh 'npm test'
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline ejecutado exitosamente.'
        }
        failure {
            echo 'Pipeline fallido. Revisa los errores.'
        }
    }
}
