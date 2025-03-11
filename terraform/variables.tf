variable "region" {
  description = "AWS region"
  default     = "eu-north-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "key_name" {
  description = "AWS Key Pair for SSH"
  default     = "terraform-key"
}
