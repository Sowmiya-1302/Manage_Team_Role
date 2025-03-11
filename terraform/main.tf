resource "aws_instance" "teamapp_server" {
  ami           = "ami-016038ae9cc8d9f51"  # Amazon Linux 2 AMI (Check latest in AWS)
  instance_type = var.instance_type
  key_name      = var.key_name

  security_groups = [aws_security_group.instance_sg.name]

  tags = {
    Name = "TeamRoleManage-Server"
  }
}

resource "aws_eip" "my_eip" {
  instance = aws_instance.teamapp_server.id
  domain   = "vpc"
}

resource "aws_security_group" "instance_sg" {
  name        = "allow_ssh_http"
  description = "Allow SSH and HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH from anywhere (restrict in production)
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow HTTP access
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow HTTPS access
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
