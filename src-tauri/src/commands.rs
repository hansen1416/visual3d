use std::path::Path;

#[tauri::command]
pub fn start_command() {
    println!("Command starts!!!, command");
}

#[tauri::command(rename_all = "snake_case")]
pub fn greet(filename: &str) {
    // format!("Hello, {}! You've been greeted from Rust!", name).into()

    let path: &str = "path/to/your/file.txt";

    // Create a Path object
    let file_path: &Path = Path::new(filename);

    // Check if the file exists
    if file_path.exists() {
        println!("The file exists at the specified path: {}", path);
    } else {
        println!("The file does not exist at the specified path: {}", path);
    }
}
