#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name).into()
}

#[tauri::command(rename_all = "snake_case")]
pub fn start_command(my_arg: String) {
    println!("Command starts!!!, command: {}", my_arg);
}
