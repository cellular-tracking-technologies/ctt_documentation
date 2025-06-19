blu <- read.csv("~/Downloads/CTT-V30B0154C5DE-blu.2024-09-12_165027-1.csv")
#testval <- "8C08D009" # this should result in solar voltage of 2188 and temp of 2512
testval2 <- c("E803",	"ED03",	"F203",	"F703",	"FC03",	"0104",	"0604",	"0B04",	"1004",	"1504",	"1A04",	"1F04",	"1C07",	"C607",	"7008",	"1A09",	"C409",	"6E0A",	"180B",	"C20B",	"6C0C",	"160D",	"C00D",	"6A0E",	"140F",	"BE0F",	"6810")

parseit <- function(y) {
  hex_to_raw <- function(x) {
    digits <- strtoi(strsplit(x, "")[[1]], base=16L)
    raw <- as.raw(bitwShiftL(digits[c(TRUE, FALSE)],4) + digits[c(FALSE, TRUE)])
    readBin(raw, what='integer', n=1, size=2, endian = "little")
  }
  tryCatch({
    if(nchar(y) > 3) {
      vals <- sapply(seq(from=1, to=nchar(y), by=4), function(i) substr(y, i, i+3))
      parsedvals <- sapply(vals, hex_to_raw)
    } else {parsedvals <- NA}
    return(parsedvals)
  }, error = function(msg) {return(NA)})
}

parsed <- lapply(blu$Payload, parseit)
tryparsed <- lapply(testval2, parseit)
do.call(rbind,lapply(parsed,matrix,ncol=max(sapply(parsed, length)),byrow=TRUE))