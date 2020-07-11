﻿using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;


namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Venue { get; set; }
        public string City { get; set; }
        public DateTime Date { get; set; }
        [JsonProperty("Attendees")]
        public ICollection<AttendeeDto> UserActivities { get; set; }
    }
}