"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button, Group, Modal, Text } from "@mantine/core";

const LoginDialog = ({ close }: any) => {
  return (
    <Modal opened onClose={close} title="Sign Up to Start Exploring!">
      <Text pt="lg" pb="lg">
        Create a free account to try the app and access all features. It only
        takes a minute!
      </Text>
      <Group dir="rtl" mt="lg">
        <SignUpButton>
          <div>
            <Button component="a">Sign Up</Button>
          </div>
        </SignUpButton>
        <SignInButton>
          <div>
            <Button variant="outline">Sign In</Button>
          </div>
        </SignInButton>
      </Group>
    </Modal>
  );
};

export default LoginDialog;
