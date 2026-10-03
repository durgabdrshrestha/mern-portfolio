// Get-Content server\.env | ForEach-Object {
//     if ($_ -match "^MONGODB_URI=") {
//         $uri = $_.Substring(13)
//         try {
//             $u = [System.Uri]$uri
//             "MONGODB_URI = $($u.Host)"
//         } catch {
//             "MONGODB_URI = configured"
//         }
//     }
//     elseif ($_ -match "^ADMIN_EMAIL=") {
//         "ADMIN_EMAIL = " + $_.Substring(12)
//     }
//     elseif ($_ -match "^ADMIN_NAME=") {
//         "ADMIN_NAME = " + $_.Substring(11)
//     }
// } this code is run by your project directory directly 