public static void main(String[] args) {
  // reading from an in pin
//   InPin button = new InPin(8);
//   boolean isButtonPressed = button.getValue();
//   button.close();

  // writing to an out pin
  OutPin led = new Outpin(26);
  led.setValue(true);
  //led.setValue(false);
  led.close();
}
