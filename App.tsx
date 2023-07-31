import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, Storage }  from 'aws-amplify';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
//import  { configure }  from "@aws-amplify/core";
//import  {configure}   from 'aws-amplify';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
//import awsConfig from './aws-exports';

const awsConfig = {
    
  "aws_project_region": "eu-north-1",
  "aws_cognito_identity_pool_id": "eu-north-1:7023e7f5-3703-4f21-8fa6-247a795bacfa",
  "aws_cognito_region": "eu-north-1",
  "aws_user_pools_id": "eu-north-1_xMHxCXQls",
  "aws_user_pools_web_client_id": "5frmjnjh51igisggbma88c07hb",
  "oauth": {},
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],
  "aws_appsync_graphqlEndpoint": "https://agzuzjpjcncf3b5mjtpf5afthq.appsync-api.eu-north-1.amazonaws.com/graphql",
  "aws_appsync_region": "eu-north-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_user_files_s3_bucket": "netflix49b040bd779644519ba8d91c478e9c9a11218-netflix",
  "aws_user_files_s3_bucket_region": "eu-north-1"

}

Amplify.configure(awsConfig);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
