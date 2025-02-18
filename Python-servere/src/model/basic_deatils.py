# schemas.py
from pydantic import BaseModel, HttpUrl, EmailStr
from typing import List, Optional

class Scope(BaseModel):
    applicationType: str
    address: HttpUrl

class UserDetail(BaseModel):
    url: HttpUrl
    username: str

class SecurityTool(BaseModel):
    name: str
    desc: str

class BasicReport(BaseModel):
    companyName: str
    version: str
    author: str
    comment: Optional[str]
    date: str
    targetScopeTable: List[Scope]
    userDeatialTable: List[UserDetail]
    securityTool: List[SecurityTool]
