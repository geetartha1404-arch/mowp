Add-Type -AssemblyName System.IO.Compression.FileSystem

function Get-DocxText($path) {
    # Copy to a temp path to bypass file lock
    $tempPath = [System.IO.Path]::GetTempFileName()
    try {
        Copy-Item -Path $path -Destination $tempPath -Force
        
        $zip = [System.IO.Compression.ZipFile]::OpenRead($tempPath)
        $entry = $zip.GetEntry("word/document.xml")
        if ($null -eq $entry) {
            Write-Error "Could not find word/document.xml in $path"
            return ""
        }
        $stream = $entry.Open()
        $reader = New-Object System.IO.StreamReader($stream)
        $xmlText = $reader.ReadToEnd()
        $reader.Close()
        $stream.Close()
        $zip.Dispose()
        
        $xml = [xml]$xmlText
        $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
        $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
        
        $paragraphs = $xml.SelectNodes("//w:p", $ns)
        $lines = [System.Collections.Generic.List[string]]::new()
        
        foreach ($p in $paragraphs) {
            $pText = ""
            $tNodes = $p.SelectNodes(".//w:t", $ns)
            foreach ($t in $tNodes) {
                $pText += $t.InnerText
            }
            $lines.Add($pText)
        }
        
        return [string]::Join("`r`n", $lines)
    }
    finally {
        if (Test-Path $tempPath) {
            Remove-Item $tempPath -Force
        }
    }
}

try {
    $planText = Get-DocxText("d:\Projects\mowp\WorkOS_Implementation_Plan.docx")
    $prdText = Get-DocxText("d:\Projects\mowp\WorkOS_PRD_v1.docx")

    [System.IO.File]::WriteAllText("d:\Projects\mowp\plan.txt", $planText)
    [System.IO.File]::WriteAllText("d:\Projects\mowp\prd.txt", $prdText)
    Write-Output "Successfully extracted plan.txt and prd.txt with paragraphs"
}
catch {
    Write-Error $_.Exception.Message
}
