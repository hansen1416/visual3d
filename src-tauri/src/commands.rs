use std::path::Path;
// use std::fs;
// use std::path::PathBuf;
// use serde_pickle::{ from_reader, Error };

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

// #[tauri::command(rename_all = "snake_case")]
// pub fn greet(filename: &str) {
//     // Construct the path to the file in the $DOCUMENT directory
//     let documents_path = std::env::var("DOCUMENTS").unwrap_or_else(|_| String::from("."));
//     let file_path = PathBuf::from(documents_path).join(filename);

//     // Check if the file exists
//     if !file_path.exists() {
//         println!("File does not exist: {:?}", file_path);
//         // return Ok(None);
//         return;
//     }

//     // Open the file and read the contents
//     let file = fs::File::open(&file_path).map_err(|e| {
//         println!("Failed to open the file: {:?}", e);
//         // Error::Io(e)
//         return;
//     });

//     println!("File exists: {:?}", file_path);

//     // Deserialize the pickle data
//     // let data: Vec<u8> = from_reader(file, )?;

//     // Ok(Some(data))
// }
