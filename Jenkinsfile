#!groovy

properties(
    [
        [$class: 'BuildDiscarderProperty', strategy:
          [$class: 'LogRotator', artifactDaysToKeepStr: '14', artifactNumToKeepStr: '5', daysToKeepStr: '30', numToKeepStr: '60']],
        pipelineTriggers(
          [
              pollSCM('H/15 * * * *'),
              cron('@daily'),
          ]
        )
    ]
)
node {

    stage('Checkout') {
        //disable to recycle workspace data to save time/bandwidth
        deleteDir()
        checkout scm
    }

  
      stage('Test') {
          echo "Test in Progress"
          
      }

      
      stage('Build') {
         echo "ng build"
      }
    }
    
    stage('Archive') {
       
    }

    stage('Deploy') {
          echo "deploying "
    }
