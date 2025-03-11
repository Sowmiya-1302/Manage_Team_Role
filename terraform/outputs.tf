output "instance_public_ip" {
  description = "Public IP of EC2 instance"
  value       = aws_instance.teamapp_server.public_ip
}

output "elastic_ip" {
  description = "Public Elastic IP of the EC2 instance"
  value       = aws_eip.my_eip.public_ip
}
