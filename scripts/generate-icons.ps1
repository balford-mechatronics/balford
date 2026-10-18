$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$iconDir = Join-Path $root "apps\chrome-extension\icons"
New-Item -ItemType Directory -Force -Path $iconDir | Out-Null

foreach ($size in 16, 32, 48, 128) {
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $background = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        [System.Drawing.Color]::FromArgb(0, 58, 0),
        [System.Drawing.Color]::FromArgb(0, 168, 107),
        45
    )
    $graphics.FillRectangle($background, $rect)

    $accentSize = [Math]::Max(2, [Math]::Round($size * 0.14))
    $accent = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(127, 224, 176))
    $graphics.FillRectangle($accent, 0, $size - $accentSize, $size, $accentSize)

    $fontSize = [Math]::Max(8, [Math]::Round($size * 0.56))
    $font = New-Object System.Drawing.Font("Arial", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textRect = New-Object System.Drawing.RectangleF(0, -($size * 0.03), $size, $size)
    $graphics.DrawString("B", $font, $textBrush, $textRect, $format)

    $output = Join-Path $iconDir ("icon{0}.png" -f $size)
    $bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)

    $format.Dispose()
    $textBrush.Dispose()
    $font.Dispose()
    $accent.Dispose()
    $background.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
}

Write-Output "Generated Chrome extension icons in $iconDir"
