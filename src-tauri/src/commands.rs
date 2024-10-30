#[tauri::command]
pub fn start_command() {
    println!("Command starts!!!, command");
}

#[tauri::command(rename_all = "snake_case")]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name).into()
}
