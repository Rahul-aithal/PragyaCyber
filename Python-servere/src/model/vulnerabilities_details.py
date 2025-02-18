from pydantic import BaseModel, HttpUrl, EmailStr
from typing import List, Optional

class base_vulnerablity(BaseModel):
    intex: str
    name: str
    desc: str
    is_pass: str
    fail: str
    reference: str

class vulnerabilityReport(BaseModel):
    vulnerabilities:List[base_vulnerablity]



